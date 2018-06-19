import React, { Component } from 'react'
import './TodoInput.css'
import icon_add from './icon/add.svg'

class TodoInput extends Component {
  render() {
    return <div className='inputWrapper'>
      <label htmlFor='add'><img src={icon_add} alt='add' /></label>
      <input id='add' type="text"
        value={this.props.content}
        onKeyUp={this.submit.bind(this)}
        onChange={this.change.bind(this)}
        maxLength="40" placeholder="添加待办事项" />
    </div>
  }
  submit(e) {
    if (e.target.value.trim() !== '' && e.keyCode === 13) {
      this.props.onSubmit.call()
    }
  }
  change(e) {
    this.props.onChange.call(undefined, e.target.value)
  }
}

export default TodoInput