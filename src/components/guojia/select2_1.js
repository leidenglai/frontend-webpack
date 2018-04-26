var fastbannerform_status = true

export function hendleCountrySelect() {
  $('.fio__upper')
    .off('input propertychange paste focusout')
    .on('input propertychange paste focusout', function() {
      for (
        var parts = $(this)
            .val()
            .split(' '),
          i = 0;
        i < parts.length;
        i++
      )
        parts[i] = parts[i].charAt(0).toUpperCase() + parts[i].substring(1).toLowerCase()
      $(this).val(parts.join(' '))
    })

  $('.fastbannerform__country').select2({
    templateResult: formatState,
    templateSelection: formatState
  })

  $('body')
    .off('click', '[data-openaccount-page] button')
    .on('click', '[data-openaccount-page] button', function() {
      var block = $(this),
        text = $(this).html(),
        blockform = $(this).parents('.fastbannerform__form')

      if (fastbannerform_status) {
        blockform.find('.fastbannerform__flex__input input').removeClass('fastbannerform__red')

        fastbannerform_status = false
        blockform.find('.fastbannerform__error').hide()
        blockform.find('.fastbannerform__error, .fastbannerform__logincount').html('')

        $.ajax({
          url: root_http + 'fast_open_live_account.php',
          type: 'POST',
          data: blockform.serialize(),
          dataType: 'json',
          beforeSend: function() {
            block.html('<i class="preloader_white_mini" style="margin: 0 auto;"></i>')
          },
          success: function(ret) {
            if (!ret.error) {
              $.ajax({
                type: 'POST',
                url: 'https://client-api.instaforex.com/api/openaccount/anonymous',
                data: ret,
                dataType: 'json',
                success: function(ret) {
                  blockform.find('.fastbannerform__formcontent, .fastbannerform__error').hide()
                  blockform.find('.fastbannerform__login').show()
                  blockform.find('.fastbannerform__logincount').html(ret.Login)

                  block.html(text)
                  fastbannerform_status = true
                }
              })
            } else {
              if (typeof ret.alert == 'object') {
                $.each(ret.alert, function(key, val) {
                  blockform.find('input[name="' + key + '"]').addClass('fastbannerform__red')
                  blockform
                    .find('.fastbannerform__error')
                    .html(
                      blockform.find('.fastbannerform__error').html() + '<div>' + val + '</div>'
                    )
                })

                blockform.find('.fastbannerform__error').show()
              } else if (typeof ret.alert == 'string') {
                blockform.find('.fastbannerform__error').html(ret.alert)
              }

              block.html(text)
              fastbannerform_status = true
            }
          }
        })
      }

      return false
    })

  $('body')
    .off('click', '.fastbannerform__flex__close span')
    .on('click', '.fastbannerform__flex__close span', function() {
      $('.fastbannerform__login').hide()
      $('.fastbannerform__formcontent').show()

      $('.fastbannerform__form input[type="text"]').val('')
      $('.fastbannerform__form input[type="checkbox"]').removeAttr('checked')
    })
}

function formatState(state) {
  if (!state.id) {
    return state.text
  }
  var stateline = $(
    '<span class="fastbannerform__span f32 NOFLAG ' +
      state.title +
      '"></span> <span class="fastbannerform__span">' +
      state.text +
      '</span>'
  )
  return stateline
}
