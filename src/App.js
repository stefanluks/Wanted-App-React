import "./styles.css";
import React from "react";
import { personagens } from "./dados.json";

class Cartao extends React.Component {
  render() {
    return (
      <div className="Card" onClick={this.props.onClick}>
        <img
          className="icone-card"
          alt="icone do card"
          src={this.props.imagem}
        />
        <div className="info-card">
          <h2>{this.props.nome}</h2>
          <i>{this.props.alcunha}</i>
          <text>recompensa: ฿ {this.props.recompensa},00</text>
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartaz: false,
      buscando: false,
      busca: null,
      pessoa: {
        nome: null,
        alcunha: null,
        recompensa: null,
        imagem: null
      }
    };
    this.personagens = personagens;
  }

  TestarPossibilidades(entrada, nome) {
    let nome_separado = nome.split(" ");
    let existe = false;
    nome_separado.forEach((n) => {
      if (entrada.toLowerCase() === n.toLowerCase()) {
        existe = true;
        return true;
      }
    });
    return existe;
  }

  buscar() {
    let entry = document.querySelector(".entrada").value;
    let saida = [];
    this.personagens.forEach((p) => {
      if (
        entry === p.nome ||
        entry === p.alcunha ||
        this.TestarPossibilidades(entry, p.nome) ||
        this.TestarPossibilidades(entry, p.alcunha)
      ) {
        saida.push(p);
      }
    });
    this.setState({ busca: saida });
  }

  render() {
    var card = "";
    if (this.state.cartaz) {
      card = "cartaz aberto";
    } else {
      card = "cartaz fechado";
    }
    var busca = this.state.busca;
    var entrada = "entrada entry-fechada";
    if (this.state.buscando) {
      entrada = "entrada entry-aberta";
    }
    return (
      <div className="App">
        <div className="barra">
          <div className="icone">W</div>
          <text className="appName">WANTED</text>
          <input className={entrada} onChange={this.buscar.bind(this)} />
          <img
            alt="lupinha"
            className="ico-lupa"
            src="/img/25313.png"
            onClick={() => {
              this.setState({ buscando: !this.state.buscando });
              let entrada = document.querySelector(".entrada");
              entrada.focus();
            }}
          />
        </div>
        <div className={card}>
          <div
            className="btn-close"
            onClick={() => this.setState({ cartaz: !this.state.cartaz })}
          >
            X
          </div>
          <h1 className="wanted">WANTED</h1>
          <img
            className="img-cartaz"
            alt="foto do cartaz"
            src={this.state.pessoa.imagem}
          />
          <h1 className="dead">DEAD OR ALIVE</h1>
          <h2 className="nome-cartaz">{this.state.pessoa.nome}</h2>
          <i className="cartaz-alcunha">{this.state.pessoa.alcunha}</i>
          <h2 className="cartaz-recompensa">
            ฿{this.state.pessoa.recompensa},00
          </h2>
        </div>
        {!this.state.buscando ? (
          <div className="caixa">
            {this.personagens.map((pessoa) => (
              <Cartao
                nome={pessoa.nome}
                alcunha={pessoa.alcunha}
                recompensa={pessoa.recompensa}
                imagem={pessoa.imagem}
                onClick={() =>
                  this.setState({
                    pessoa: pessoa,
                    cartaz: !this.state.cartaz
                  })
                }
              />
            ))}
          </div>
        ) : (
          <div className="caixa">
            {busca != null ? (
              <>
                {busca.map((pessoa) => (
                  <Cartao
                    nome={pessoa.nome}
                    alcunha={pessoa.alcunha}
                    recompensa={pessoa.recompensa}
                    imagem={pessoa.imagem}
                    onClick={() =>
                      this.setState({
                        pessoa: pessoa,
                        cartaz: !this.state.cartaz
                      })
                    }
                  />
                ))}
              </>
            ) : (
              <text>Buscando...</text>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default App;
