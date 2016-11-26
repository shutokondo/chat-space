## ChatSpaceデータベース設計

### users
- name
- email
- password
- password_confirmation

### groups
- name

### group_users
- user_id
- group_id

### messages
- body
- image
- group_id
- user_id