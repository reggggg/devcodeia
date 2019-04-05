import React, {Component} from 'react';
import { Container } from 'reactstrap';

import '../../css/landingPage/Clients.css';


let count;

class Clients extends Component {

  constructor(props){
    super(props);
    this.state = {
      clientsData: [
        {
          id: 1,
          title: 'Line JR Platform',
          category: 'Business Incubation',
          desc: 'A business incubator especially made for blockchain businesses.',
        },
        {
          id: 2,
          title: 'Athena KYC',
          category: 'Digital Identity Platform',
          desc: 'Athena KYC aims to lessen the hassle of data redundancy and increase data security',
        },
        {
          id: 3,
          title: 'Dream Tech',
          category: 'Gaming Platform',
          desc: 'Dream Tech is a gaming platform catered with cryptocurrency. It aims to provide an accessible gaming platform to cryptocurrency enthusiasts.',
        },
        {
          id: 4,
          title: 'VPN Cash',
          category: 'Cryptocurrency Platform',
          desc: 'A VPN website that aims to share user’s unused bandwidths to other users. It is a cryptocurrency platform. ',
        }
      ],
      bodyTitle: '',
      bodyCategory: '',
      bodyDesc: '',
      activeIndex: 0
    }
  }



  componentDidMount(){
    this.setState({
      bodyTitle: this.state.clientsData[0].title,
      bodyCategory: this.state.clientsData[0].category,
      bodyDesc: this.state.clientsData[0].desc,
    });
    count = setInterval(() => {
      let index = this.state.activeIndex;
      let dataLength = this.state.clientsData.length - 1;
      if(index === dataLength){
        index = - 1;
      }
      ++index;
      this.setState({
        activeIndex: index,
        bodyTitle: this.state.clientsData[index].title,
        bodyCategory: this.state.clientsData[index].category,
        bodyDesc: this.state.clientsData[index].desc,
      });
      // console.log(this.state.activeIndex);
    }, 3000);
  }

  componentWillUnmount(){
    clearInterval(count);
  }

  setStateActive = async (item, tab) => {
    await this.setState({
      bodyTitle: item.title,
      bodyCategory: item.category,
      bodyDesc: item.desc,
      activeIndex: tab,
    });
  }

  render(){
    return (
      <div className="clients" id="clients">
        <Container>
          <div className="clientsContent">
            <div className="titleBar">
              {/* <span>Testimonials</span> */}
              <h2>Our Projects</h2>
            </div>
          </div>
        </Container>
        <div className="clientsBody">
          <img className="clientsIcon" src={require('../../images/img-TestiIcon.png')} alt=""/>
          <Container>
            <div className="animate" id="animate">
              <h2>{this.state.bodyTitle}</h2>
              <h3>{this.state.bodyCategory}</h3>
              <p>{this.state.bodyDesc}</p>
            </div>
            <div className="pagination">
              {
                this.state.clientsData.map(( item, index ) => (
                  <span onClick={() => this.setStateActive(item, index)}
                        key={index}
                        className={this.state.activeIndex === index ? 'activeState' : ''}
                  />
                ))
              }
            </div>
          </Container>
        </div>
      </div>
    );
  }
}
export default Clients;
