$(function() {
  function buildHTML(message) {
    var html = '<li>' +
      '<div class="list-header">' +
      '<div class="list-header__name left">' +
      message.user.name +
      '</div>' +
      '<div class="list-header__date left">' +
      new Date(message.created_at).toLocaleString() +
      '</div>' +
      '</div>' +
      '<div class="list-message">' +
      message.body +
      '</div>' +
      '</li>';
    return html;
  }

  function scrollToBottom() {
    $('.chat-body').scrollTop($('.chat-info').height());
  }

  $('#new_message').submit(function(e) {
    e.preventDefault();
    var $path = $(this)[0].getAttribute('action');
    var $message = $('#message_body').val();

    $.ajax({
      type: 'POST',
      url: $path + '.json',
      data: {
        message: {
          body: $message
        }
      },
      dataType: 'json'
    })
    .done(function(data) {
      var html = buildHTML(data);
      $('.chat-info').append(html);
      $('#message_body').val('');
      scrollToBottom();
    })
    .fail(function(error) {
      alert("エラーが発生しました");
    })
  });
});