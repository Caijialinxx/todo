import React, { Component } from 'react'
import $ from 'jquery'
import 'normalize.css'
import './reset.css'
import './App.css'
import TodoItem from './TodoItem'
import TodoInput from './TodoInput'
import Scrollbar from './Scrollbar'
import * as localStore from './localStore'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newTodo: '',
      todoList: localStore.load('todoList') || [
        {
          content: '终于等到你，以下是使用指南：',
          status: 'undone'
        },
        {
          content: '1. 使用 localStorage 进行存储，随意刷新',
          status: 'undone'
        },
        {
          content: '2. 点一下我，可以把状态切换成「已完成」',
          status: 'undone'
        },
        {
          content: '3. 当然「已完成」也可以切换成「未完成」',
          status: 'done'
        },
        {
          content: '4. 还可以点右边的按钮，分别是：',
          status: 'undone'
        },
        {
          content: '「置顶」：将任务置于第一条',
          status: 'undone'
        },
        {
          content: '「上移」：将任务上移一条',
          status: 'undone'
        },
        {
          content: '「下移」：将任务下移一条',
          status: 'undone'
        },
        {
          content: '「置底」：将任务置于最后一条',
          status: 'undone'
        },
        {
          content: '「删除」：删除任务',
          status: 'undone'
        },
        {
          content: '赶紧开启你的计划之旅吧！',
          status: 'undone'
        },
        {
          content: 'Tips：建议每个任务小而精，切勿好高骛远哦！',
          status: 'undone'
        }
      ]
    }
  }
  render() {
    let todos = this.state.todoList
      .filter((item) => item.status !== 'delete')
      .map((item) => {
        return <TodoItem todo={item}
          onToggle={this.changeItemStatus.bind(this)}
          onMove={this.moveAction.bind(this)}
          onDelete={this.deleteItem.bind(this)}
        />
      })

    return (
      <div className='App'>
        <header className='todo-header'>
          <h1 className='todo-title'>我的待办</h1>
        </header>
        <div className='todo-list'>
          <Scrollbar />
          <ul>{todos}</ul>
        </div>
        <TodoInput className='todo-inputWrapper' id='add'
          content={this.state.newTodo}
          onSubmit={this.addItem.bind(this)}
          onChange={this.changeNewtodo.bind(this)} />
      </div>
    )
  }
  componentDidMount() {
    this.showScroll()
  }
  componentDidUpdate() {
    this.showScroll()
    localStore.save('todoList', this.state.todoList)
  }
  showScroll() {
    let contentHeight = $('.todo-list ul').outerHeight(true),
      scrollTop = undefined
    if (contentHeight > 440) {
      $('.scrollWrapper').css({ display: 'block' })
      $('.scrollBar').css({ height: `${440 * 440 / contentHeight}px` })
      $('.todo-list').scroll(function () {
        scrollTop = $('.todo-list').scrollTop()
        $('.scrollBar').css({ top: `${scrollTop / contentHeight * 100}%` })
      })
    } else {
      $('.scrollWrapper').css({ display: 'none' })
    }
  }
  addItem() {
    this.state.todoList.push({
      content: this.state.newTodo,
      status: 'undone'
    })
    this.setState({
      newTodo: '',
      todoList: this.state.todoList
    })
  }
  changeNewtodo(value) {
    this.setState({
      newTodo: value,
      todoList: this.state.todoList
    })
  }
  changeItemStatus(eventTarget, todoTarget) {
    if (todoTarget.todo.status === 'undone') {
      todoTarget.todo.status = 'done'
      $(eventTarget.children[0])[0].src = todoTarget.done
      $(eventTarget.children[1]).addClass('done')
    } else {
      todoTarget.todo.status = 'undone'
      $(eventTarget.children[0])[0].src = todoTarget.undone
      $(eventTarget.children[1]).removeClass('done')
    }
    this.setState(this.state)
  }
  deleteItem(todoTarget) {
    todoTarget.status = 'delete'
    this.setState(this.state)
  }
  moveAction(eventTarget, action) {
    let currentElem = $(eventTarget).parents('li'),
      allLi = $('li'),
      index = $(currentElem).index(),
      lastIndex = $(currentElem).parent().children().length - 1

    if (action === 'toTop') {
      if (index === 0) {
        alert('已经是第一个啦！')
      } else {
        $(allLi).eq(0).before($(currentElem))
      }
    } else if (action === 'moveUp') {
      if (index === 0) {
        alert('已经是第一个啦！')
      } else {
        $(allLi).eq(index - 1).before($(currentElem))
      }
    } else if (action === 'moveDown') {
      if (index === lastIndex) {
        alert('已经是最后一个啦！')
      } else {
        $(allLi).eq(index + 1).after($(currentElem))
      }
    } else if (action === 'toBottom') {
      if (index === lastIndex) {
        alert('已经是最后一个啦！')
      } else {
        $(allLi).eq(lastIndex).after($(currentElem))
      }
    }
  }
}

export default App
