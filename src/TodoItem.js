import React, { Component } from 'react'
import './TodoItem.css'
import icon_undone from './icon/square.svg'
import icon_done from './icon/square_ok.svg'
import icon_top from './icon/top.svg'
import icon_up from './icon/up.svg'
import icon_down from './icon/down.svg'
import icon_bottom from './icon/bottom.svg'
import icon_delete from './icon/bin.svg'

class TodoItem extends Component {
  render() {
    let statusImg
    if (this.props.todo.status === 'undone') {
      statusImg = icon_undone
    } else if (this.props.todo.status === 'done') {
      statusImg = icon_done
    }

    return <li>
      <div id='itemWrapper' className={this.props.todo.status} onClick={this.toggle.bind(this)}>
        <img src={statusImg} alt='done' />
        <span>{this.props.todo.content}</span>
      </div>
      <div className='optionsWrapper'>
        <img src={icon_top} alt='top' onClick={this.top.bind(this)} />
        <img src={icon_up} alt='up' onClick={this.up.bind(this)} />
        <img src={icon_down} alt='down' onClick={this.down.bind(this)} />
        <img src={icon_bottom} alt='bottom' onClick={this.bottom.bind(this)} />
        <img src={icon_delete} alt='delete' onClick={this.delete.bind(this)} />
      </div>
    </li>
  }
  toggle(e) {
    this.props.onToggle.call(undefined, this.props.todo);
  }
  top(e) {
    this.props.onMove.call(undefined, e.currentTarget, 'toTop')
  }
  up(e) {
    this.props.onMove.call(undefined, e.currentTarget, 'moveUp')
  }
  down(e) {
    this.props.onMove.call(undefined, e.currentTarget, 'moveDown')
  }
  bottom(e) {
    this.props.onMove.call(undefined, e.currentTarget, 'toBottom')
  }
  delete() {
    this.props.onDelete.call(undefined, this.props.todo)
  }
}

export default TodoItem