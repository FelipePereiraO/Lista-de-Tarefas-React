import React, {Component} from 'react';
import './App.css';
class Lista extends Component{
  constructor(){
      super()
      this.state = {
          nome: "",
          inputNome: "",
          tarefas: [],
          inputTarefa: "" 
          
      }
      this.add = (ev) =>{
          ev.preventDefault()
          const nome = this.state.inputNome.toUpperCase().slice()
          const tarefas = this.state.tarefas.slice()
          tarefas.push(this.state.inputTarefa)
          this.setState({nome: nome, inputNome: "" ,tarefas: tarefas, inputTarefa: ""})
      }
      this.onChange = (ev) =>{
          ev.preventDefault()
          const campo = Object.assign({},this.state)
          campo[ev.target.name] = ev.target.value
          this.setState(campo)
      }

      this.remove = (index) => {
          const tarefas = this.state.tarefas.slice()
          tarefas.splice(index, 1)
          this.setState({tarefas})

      }
      this.Editar = (index, valor) =>{
          const tarefas = this.state.tarefas.splice()
          tarefas[index] = valor
          this.setState({tarefas})
      }
  }
  render(){
      return(
          <List
              nome={this.state.nome}
              inputNome={this.state.inputNome}
              tarefas={this.state.tarefas}
              inputTarefa={this.state.inputTarefa}
              onChange={this.onChange}
              add={this.add}
              remove={this.remove}
              Editar={this.Editar}/>
          )
      }
}
const List = (props) =>(
  <div>
      <h1 className="text-white">Lista de Tarefas</h1>
      <div id="fac"> 
          <label>Nome da Tarefa</label><br/>
          <input className="form-control" id="tex1" name="inputNome" value={props.inputNome} onChange={props.onChange} /><br/>
          <label>Descrição da Tarefa</label><br/>
          <textarea className="form-control" id="tex2" name="inputTarefa" value={props.inputTarefa} onChange={props.onChange}/><br/>
          <button className="btn btn-secondary" onClick={props.add}>Adicionar<br/></button><br/>
          {
              
              
              props.tarefas.map((tarefa, index) => (
                  <ListItens
                      key = {index}
                      nome={props.nome}
                      tarefa ={tarefa}
                      index = {index}
                      remove = {props.remove}
                      Editar = {props.Editar}/>
              ))
          }
      </div>   
  </div>
  
)
class ListItens extends React.Component{
  constructor(props){
      super(props)
      this.state ={
          edit: false,
          nome: this.props.nome,
          texto: props.tarefa 
      }
      this.remove = () =>{
          this.props.remove(this.props.index)
      }
      this.Editar = () =>{
          this.props.Editar(this.props.index, this.state.texto)
          this.setState({edit: false})
      }
      this.Abrir = () => {
          this.setState({edit: true})
      }
      this.Fechar = () => {
          this.setState({edit: false})
      }
      this.onChange = (ev) => {
          this.setState({texto: ev.target.value})
      }
  }
  render(){
      if(!this.state.edit){
          return(
              <p id="tabela">
                  Tarefa N
                  {this.props.index +1}°<br/>
                  Nome da Tarefa:<br/>
                  <li id="tab1">
                      {this.state.nome} <br/>
                  </li>
                   Descrição da Tarefa:<br/>
                  <p id="tab">
                      {this.props.tarefa} <br/>
                  </p>
                  <button className="btn btn-secondary" onClick={this.Abrir}>Atualizar</button>
                  <button className="btn btn-secondary" onClick={this.remove}>Remover</button>
                  <br/>
              </p>
          )
      }
      return(
          <div id="tabela">
              Tarefa N{this.props.index+1}°
              Descrição da Tarefa:<br/>             
              <textarea className="form-control"  value={this.state.texto} onChange={this.onChange}/>
              <button className="btn btn-secondary" onClick={this.Editar}>Salvar</button>
              <button className="btn btn-secondary" onClick={this.Fechar}>Cancelar</button>
          </div>
      )
  }
}

function App() {
  return (
    <div className="App">
      <Lista/>
      <hr/>
      <footer className="text-white">Felipe Pereira &copy;</footer>
    </div>
  );
}
export default App
