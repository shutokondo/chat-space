$(function() {
  function buildSearchUserHTML(user) {
    var html = '<div class="chat-group-user">' +
      '<p class="chat-group-user__name">' +
      user.name +
      '</p>' +
      '<a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="' +
      user.id +
      '" data-user-name="' +
      user.name +
      '">' +
      "追加" +
      '</a>' +
      '</div>';
    return html;
  }

  function buildChatMemberHTML(id, name) {
    var html = '<div class="chat-group-user clearfix" id="chat-group-user-' +
    id +
    '">' +
    '<input type="hidden" name="group[user_ids][]" value="' +
    id +
    '">' +
    '<p class="chat-group-user__name">' +
    name +
    '</p>' +
    '<a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove">' +
    "削除" +
    '</a>' +
    '</div>';
    return html;
  }

  //ユーザー検索
  $('#user-search-field').on('keyup', function() {
    var input = $(this).val();
    $.ajax({
      type: 'GET',
      url: '/users',
      dataType: 'json',
      data: { keyword: input }
    })
    .done(function(data) {
      searchUser(data);
      addUser();
    })
    .fail(function(error) {
      alert(error);
    })
  })

  function searchUser(users) {
    $('#user-search-result').empty();
      for (var i = 0; i < users.length; i++) {
        var html = buildSearchUserHTML(users[i]);
        $('#user-search-result').append(html);
    };
  };

  //ユーザー追加
  function addUser() {
    $('.user-search-add').on('click', function() {
      var userId = $(this).data('user-id');
      var userName = $(this).data('user-name');
      var html = buildChatMemberHTML(userId, userName);
      $('#chat-group-users').append(html);
    });
  }
})