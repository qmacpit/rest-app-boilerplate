var ClassNames = require( 'classnames');

module.exports = {
  bindHandler: function(fn, context, index) {
    return function() {
      context.setSelectedIndex(index);
      return fn.call(context, index);
    }
  },
  clearSelection(){
    this.setSelectedIndex(-1);
  },
  setSelectedIndex(index){
    this.setState({
      selectedIndex: index
    });
  },
  getClasses(index){
    var classes = ClassNames({
      'list-group-item': true,
      'active': ( this.state && index === this.state.selectedIndex )
    });
    return classes;
  },
};