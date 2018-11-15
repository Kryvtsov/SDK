import React from "react";
import ItemSDK from "../ItemSDK";
import "./SDK.scss";

const jsonSDKs = require("../sdks.json");
const sdks = jsonSDKs.results;

class SDK extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTag: "all",
      search: "",
      sdks,
      sdksFiltered: sdks
    };
      this.checkboxHandler = this.checkboxHandler.bind(this);
  }
    checkboxHandler(e) {
        this.setState({
            checked: e.target.checked
        });
    }

  handleChange = event => {
    this.setState({
        search: event.target.value,
        sdksFiltered: sdks.filter(item => {
            return item.title.toLowerCase().search(
                event.target.value.toLowerCase()) !== -1;
         })
    })
  };


  checkTag = tagTitle => this.setState({ activeTag: tagTitle });

  checkBox = (title, checked, onClick, index) => {
      return (<div
      className="filter"
      key={index}
      onClick={() => {
        onClick(title)
          if (title !== "all") {
          this.setState( () => {
              return { sdksFiltered: sdks.filter(x => x.tags[0] === title.toLowerCase()) }
          })} else {
          this.setState( () => {
              return { sdksFiltered: sdks }
              })
            }
      }}
    >
      <input type="checkbox" name={title} id={title} checked={checked} onChange={ this.checkboxHandler }/>
      <strong className="filter-lable">{title}</strong>
    </div>)
  };

  render() {
    const { sdks,sdksFiltered, activeTag, search } = this.state;
    const uniqueTags = ["all"];
      sdks.forEach(sdk => {
      sdk.tags.forEach(tag => {
        if (!uniqueTags.includes(tag)) {
          uniqueTags.push(tag);
        }
      });
    });
      uniqueTags.sort().splice(0, 2, "all", "ad-network");

      return (
      <section>
        <h1 className="sdk-title">SDKs</h1>
        <div className="sdk-filters">
          <input
            type="text"
            name="search"
            placeholder="search"
            id="search"
            value={search}
            onChange={this.handleChange}
          />
          {uniqueTags.map((tag,index) =>
            this.checkBox(tag, tag === activeTag, this.checkTag, index)
          )}
        </div>
        <div className="sdk-items">
          {sdksFiltered.map(sdk => (
            <ItemSDK key={sdk.id} title={sdk.title} tags={sdk.tags} />
          ))}
        </div>
      </section>
    );
  }
}

export default SDK;
