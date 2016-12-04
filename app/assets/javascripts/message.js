$(function() {
  var messageNum = 0;

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

  function getMessage() {
    $.ajax({
      type: 'GET',
      url: document.location.href + '.json',
      dataType: 'json'
    })
    .done(function(data) {
      var insertHTML = '';
      if (messageNum === data.length) {
      } else {
        for (var i = messageNum; i < data.length; i++) {
          insertHTML += buildHTML(data[i]);
        }
        $('.chat-info').append(insertHTML);
        messageNum = data.length
      }
    })
    .fail(function(error) {
      alert(error);
    })
  }

  $('#new_message').submit(function(e) {
    e.preventDefault();
    var path = $(this)[0].getAttribute('action');
    var $message = $('#message_body').val();

    $.ajax({
      type: 'POST',
      url: path + '.json',
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

  $('#message_image').on('change', function() {
    $(this).parents('#new_message')[0].submit();
  });

  messageNum = getMessage(messageNum);

  setInterval(function() {
    getMessage(messageNum);
  }, 10000);
});
