var _data = {};

module.exports = {
  createRole: function(role, privileges) {
    _data[role] = privileges;
  },
  getRoles: function() {
    return Object.keys(_data).map(function(role){
      return {
        role: role,
        privileges: _data[role]
      }
    });
  },
  findPrivilegesByRole: function(role) {
    return _data[role];
  }
};