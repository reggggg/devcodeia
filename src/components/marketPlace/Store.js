import React, {Component} from 'react';
import { Container, Row, Col } from 'reactstrap';
import moment from 'moment';
import StarRatings from 'react-star-ratings';

import history from '../../js/history';
import Config from '../../js/config';
import { createApolloFetch } from 'apollo-fetch';


import '../../css/marketPlace/Store.css';

import { FaHeart, FaShoppingCart } from 'react-icons/fa';

let uri = Config.api;
const apolloFetch = createApolloFetch({ uri });
class Store extends Component {
  constructor(props){
    super(props);
    this.state = {
      itemsRendering: false,
      activeTab: 1,
      templateData: [],
      filteredData: []
    }
  }

  componentWillMount(){
    this.setState({
      itemsRendering: true,
    });
  }
  async componentDidMount(){
    let query = 'query{fetchTemplates{data{img id  webname linkweb desc tags img createdat creator price sales rating updatedat theme sources} success message}}';
    await apolloFetch({ query }).then((response) => {
      const success = response.data.fetchTemplates.success;
      const templates = response.data.fetchTemplates.data;
      if(success === true){
        this.setState({
          templateData: templates,
          filteredData: templates,
          itemsRendering: false
        });
      }
      console.log(this.state.templateData);
    })
  }

  setTabActive = async tab => {
    await this.setState({
      activeTab: tab
    });
    console.log(this.state.activeTab);
  }

  searchInSearchBar = async e => {
    await this.setState({
      search: e.target.value
    });
  }

  validateEmptyInput = async () => {
    if(!this.state.search){
      this.setState({
        filteredData: this.state.templateData
      });
    }else {
      await this.setState({
        itemsRendering: true
      });
      this.filterData();
    }
  }

  filterData = async () => {
    let filteredData = this.state.templateData.filter(item => {
      return item.desc.toLowerCase().includes(this.state.search.toLowerCase());
    })
    await this.setState({
      itemsRendering: false,
      filteredData: filteredData,
    });
    console.log(this.state.filteredData);
  }

  onSeachEnter = e => {
    if(e.key === 'Enter'){
      this.validateEmptyInput();
    }
  }
  addToCart = item => {
    console.log(item);
    history.push('/payment');
  }
  previewTemplate = item => {
    this.props.previewTemplate(item);
    localStorage.setItem('PreviewTemplate', JSON.stringify(item));
    history.push('/itemDetails/' + item.id);
  }

  render(){

    const tabs = [
      {tab: 'All Items'},
      {tab: 'WordPress'},
      {tab: 'HTML'},
      {tab: 'eCommerce'},
      {tab: 'UI Designs'},
      {tab: 'Plugins'},
    ];

    const categories = [
      {category: 'All Items', count: '1988'},
      {category: 'WordPress', count: '877'},
      {category: 'HTML', count: '145'},
      {category: 'eCommerce', count: '99'},
      {category: 'UI Designs', count: '872'},
      {category: 'Plugins', count: '51'},
    ];


    return (
      <div className="store">
        <Container>
          <div className="storeContent">
            <ul className="tabs">
              {
                tabs.map(( item, index ) => (
                  <li key={index}
                      onClick={() => this.setTabActive(index + 1)}
                      className={this.state.activeTab === index + 1 ? 'activeTab' : ''}
                  >{item.tab}
                  </li>
                ))
              }
            </ul>
            <Row className="searchBar">
              <Col md="10">
                <input type="text"
                       placeholder="Search here..."
                       onKeyPress={this.onSeachEnter}
                       name="search"
                       ref="searchRef"
                       onChange={this.searchInSearchBar}
                />
              </Col>
              <Col md="2">
                <button onClick={this.validateEmptyInput}>
                  Search
                </button>
              </Col>
            </Row>

            <Row className="middleBody">
              <Col md="3" className="filters">
                <h3>Category</h3>
                <hr/>
                <ul className="categories">
                  {
                    categories.map(( item, index ) => (
                      <li key={index}
                          className={this.state.activeTab === index + 1 ? 'activeCategory' : ''}
                          onClick={() => this.setTabActive(index + 1)}
                      >
                        <b>{item.category}</b>
                        {item.count}
                      </li>
                    ))
                  }
                </ul>
              </Col>
              <Col md="9" className="templatesDiv">
                {
                  this.state.itemsRendering ?
                  <div className="marketStoreLoader">
                    <img src={require('../../images/loading.gif')} alt="" />
                  </div>
                  :
                  this.state.filteredData.map(( item, index ) => (
                    <Row key={index} className="eachTemplate">
                      <Col sm="6">
                        <div className="itemImage" style={{background: 'url('+ item.img +')'}}>

                        </div>
                      </Col>
                      <Col sm="6">
                        <span className="titleAndPrice">
                          <h5>{item.desc}</h5>
                          <h6>$<b>{item.price}</b></h6>
                        </span>
                        <h6>by {item.creator}</h6>
                        <StarRatings
                          rating={item.rating}
                          starRatedColor="#F8B71C"
                          numberOfStars={5}
                          name='rating'
                          starDimension="17px"
                          starSpacing="3px"
                        />
                        <p className="tags">{item.tags.join(', ')}</p>
                        <div className="flexbetween">
                          <h6>No. of items sold: {item.sales}</h6>
                          <h4>Last update: {moment.unix(item.updatedat / 1000).format('l')}</h4>
                        </div>
                        <div className="flexbetweenButtons">
                          <button className="preview" onClick={() => this.previewTemplate(item)}>Preview</button>
                          <button className="addToFavorites" title="Add to favorites">
                            <FaHeart />
                          </button>
                          <button className="addToCart" title="Add to cart" onClick={() => this.addToCart(item)}>
                            <FaShoppingCart />
                          </button>
                        </div>
                      </Col>
                    </Row>
                  ))
                }
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    );
  }
}
export default Store;
