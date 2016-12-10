import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import {ipcRenderer} from  'electron';


class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editingQuestion: null,
      game: {
        jeopardy: {
          categories: {
            0: [
              {value: 200}, {value: 400}, {value: 600}, {value: 800}, {value: 1000}
            ],
            1: [
              {value: 200}, {value: 400}, {value: 600}, {value: 800}, {value: 1000}
            ],
            2: [
              {value: 200}, {value: 400}, {value: 600}, {value: 800}, {value: 1000}
            ],
            3: [
              {value: 200}, {value: 400}, {value: 600}, {value: 800}, {value: 1000}
            ],
            4: [
              {value: 200}, {value: 400}, {value: 600}, {value: 800}, {value: 1000}
            ]
          }
        }
      }
    };
    this.handleSave = this.handleSave.bind(this);
    this.updateCategory = this.updateCategory.bind(this);
    this.editQuestion = this.editQuestion.bind(this);
  }

  handleSave() {
    console.log(JSON.stringify(this.state.game));
    ipcRenderer.send('save-file-dialog', {data: JSON.stringify(this.state.game)});
    //this.props.saveGame(
    //hashHistory.push("/setup");
  }

  updateCategory(index, value) {
    let questions = this.state.game.jeopardy.categories[index].map(question => {
      return {...question, category: value};
    });
    let categories = this.state.game.jeopardy.categories;
    categories[index] = questions;

    this.setState({
      game: {
        ...this.state.game,
        jeopardy: {
          ...this.state.game.jeopardy,
          categories: {
            ...this.state.game.jeopardy.categories,
            ...categories
          }
        }
      }
    });
  }

  editQuestion(categoryIndex, index) {
    this.setState({
      editingQuestion: {categoryId: categoryIndex, questionId: index}
    });
    //hashHistory.push(`/edit/${categoryIndex}/${index}`);
  }

  saveQuestion(data) {

    let categories = this.state.game.jeopardy.categories;
    categories[this.state.editingQuestion.categoryId][this.state.editingQuestion.questionId] = data;

    this.setState({
      game: {
        ...this.state.game,
        jeopardy: {
          ...this.state.game.jeopardy,
          categories: {
            ...this.state.game.jeopardy.categories,
            ...categories
          }
        }
      }
    }, () => {
      this.setState({editingQuestion: null })
    });
  }

  render() {
    if (this.state.editingQuestion) { 
      var questionObj = this.state.game.jeopardy.categories[this.state.editingQuestion.categoryId][this.state.editingQuestion.questionId];
    }

    let categories = Object.keys(this.state.game.jeopardy.categories).map((categoryId, i) => {
      let categoryName = this.state.game.jeopardy.categories[categoryId].find(cat => {
        return cat.category != "";
      });
      return (
        <div key={i} className="category-section">
          <input defaultValue={categoryName ? categoryName.category : ""}
                 placeholder="Category title"
                 type="text"
                 onChange={(event) => {this.updateCategory(categoryId, event.target.value)}} />
          <Questions editQuestion={this.editQuestion}
                     categoryIndex={categoryId}
                     questions={this.state.game.jeopardy.categories[categoryId]} />
        </div>
      );
    });

    return (
      <div className="edit-screen">
      {this.state.editingQuestion &&
            <div>
              <h4>{questionObj.category} -- ${questionObj.value}</h4>
              <div>
                <textarea defaultValue={questionObj.question} id="question" ref="question" placeholder="Question" ></textarea>
              </div>
              <div>
                <input defaultValue={questionObj.answer} id="answer" ref="answer" type="text" placeholder="Answer" />
              </div>
              <div>
                <input id="youtubeLink" ref="youtubeLink" type="text" placeholder="YouTube link" />
              </div>
              <div>
                <input id="imageLink" ref="imageLink" type="text" placeholder="Image link" />
              </div>
              <button onClick={() => {
                let data = {
                  value: questionObj.value,
                  category: questionObj.category,
                  question: this.refs.question.value,
                  answer: this.refs.answer.value,
                  youtubeLink: this.refs.youtubeLink.value,
                  imageLink: this.refs.imageLink.value
                };
                this.saveQuestion(data);
              }}>Save Question</button>
            </div>

      }
      {!this.state.editingQuestion &&
            <div>
              <h2>Edit Jeopardy Categories</h2>
              {categories}
              <button onClick={this.handleSave}>Save</button>
            </div>
      }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    
  }
}

export default connect(mapStateToProps, { })(Edit);


const Questions = ({ categoryIndex, questions, editQuestion }) => {
  let vals = questions.map((question, i) => {
    return <span className="edit-question"
                 onClick={() => {editQuestion(categoryIndex, i)}}
                 key={i}>
             ${question.value}
             {(question.question && question.answer) ? <i className="fa fa-check" style={{color: "#67d067"}}></i> : null }
           </span>
  });
  return (
    <div className="question-buttons">
      {vals}
    </div>
  );
}
