$(document).on('turbolinks:load', function() {
  var user_ids = [];
  // 検索したユーザーのHTML組み立て
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

  // 追加したユーザーのHTML組み立て
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
      '<a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove" data-user-id="' +
      id +
      '">' +
      "削除" +
      '</a>' +
      '</div>';
    return html;
  }

  //検索したユーザーを表示
  function searchUser(users) {
    $('#user-search-result').empty();
    for (var i = 0; i < users.length; i++) {
      var html = buildSearchUserHTML(users[i]);
      $('#user-search-result').append(html);
    };
  };

  //インクリメンタルサーチ
  $('#user-search-field').on('keyup', function() {
    var input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: '/users.json',
      dataType: 'json',
      data: { keyword: input }
    })
    .done(function(data) {
      user_ids = data;
      searchUser(data);
    })
    .fail(function(error) {
      alert(error);
    })
  });

  //ユーザー追加
  $('#user-search-result').on('click', '.user-search-add', function() {
    var userId = $(this).data('user-id');
    var userName = $(this).data('user-name');
    var html = buildChatMemberHTML(userId, userName);
    $('#chat-group-users').append(html);
  });

  //ユーザー削除
  $('#chat-group-users').on('click', '.user-search-remove', function() {
    var userId = $(this).data('user-id');
    $('#chat-group-user-' + userId).remove();
  })
})