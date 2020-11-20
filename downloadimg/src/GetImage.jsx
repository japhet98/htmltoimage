import React, { Component } from "react";
import App from "./App";
import "./getImage.css";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";

class GetImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
      urls: [],
      isDragging: false,
      next: false,
    };

    // this.onChange = this.onChange.bind(this);
    // this.handleDrop = this.handleDrop.bind(this);
    // this.handleDragEnter = this.handleDragEnter.bind(this);
    // this.handleDragOver = this.handleDragOver.bind(this);
    // this.handleDragLeave = this.handleDragLeave.bind(this);
    // this.handleFiles = this.handleFiles.bind(this);
    // this.onRemove = this.onRemove.bind(this);
  }

  onRemove = (index) => {
    var { files, urls } = this.state;
    let newFiles = files.filter((file, i) => i !== index);
    let newUrls = urls.filter((url, i) => i !== index);

    this.setState({
      ...this.state,
      files: newFiles,
      urls: newUrls,
      name: "",
      institution: "",
    });
  };
  handleChange = (e) => {
    const target = e.target;
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleDrags = (e) => {
    e.preventDefault();
    e.stopPropagation();

    this.setState({
      ...this.state,
      isDragging: true,
    });
  };

  handleDragEnter = (e) => {
    this.handleDrags(e);
  };

  handleDragOver = (e) => {
    this.handleDrags(e);
  };

  handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();

    this.setState({
      ...this.state,
      isDragging: false,
    });
  };

  onChange = (e) => {
    e.preventDefault();
    const files = e.target.files;
    [].forEach.call(files, this.handleFiles);
  };

  handleDrop = (e) => {
    e.stopPropagation();
    e.preventDefault();

    const data = e.dataTransfer;
    const files = data.files;
    console.log("Oops...you dropped this: ", files);

    [].forEach.call(files, this.handleFiles);

    this.setState({
      ...this.state,
      isDragging: false,
    });
  };

  handleFiles = (file) => {
    // this could be refactored to not use the file reader

    var reader = new FileReader();

    reader.onloadend = () => {
      var imageUrl = window.URL.createObjectURL(file);

      this.setState({
        files: [file, ...this.state.files],
        urls: [imageUrl, ...this.state.urls],
      });
    };

    reader.readAsDataURL(file);
  };

  Next = () => {
    if (
      this.state.name !== "" &&
      this.state.institution !== "" &&
      this.state.files.length > 0
    ) {
      this.setState({
        next: true,
      });
    } else {
      this.setState({
        next: false,
      });
    }
  };

  Prev = () => {
    this.setState({
      next: false,
    });
  };
  render() {
    // eslint-disable-next-line
    const { urls, files, isDragging } = this.state;
    const dropClass = isDragging ? "dragDrop dragging" : "dragDrop";
    const Upload = (
      <div className="uploadInput">
        <input type="file" onChange={this.onChange} accept="image/*" />
        <div
          className={dropClass}
          onDrop={this.handleDrop}
          onDragOver={this.handleDragOver}
          onDragEnter={this.handleDragEnter}
          onDragLeave={this.handleDragLeave}
        >
          <div className="inside">
            <span>Drop files here</span>
            <div>
              <i className="material-icons">file_upload</i>
            </div>
          </div>
        </div>
      </div>
    );
    const screenshot = () => {
      domtoimage.toBlob(document.getElementById("node")).then(function (blob) {
        saveAs(blob, "my-node.jpg");
      });
    };
    // eslint-disable-next-line
    const Preview = (
      <div className="container responsive">
        <div className="imagePreviewContainer">
          {urls &&
            urls.map((url, i) => (
              <div className="">
                <img
                  className="imagePreview"
                  src={url}
                  alt="imagloe"
                  required
                />
                {/* <div className="details"> */}
                {/* <h6>{files[i].name}</h6>
                  <h6>{files[i].size.toLocaleString()} KBs</h6>
                  <h6>{files[i].type}</h6> */}
                <i
                  className="material-icons"
                  style={{ color: "red" }}
                  onClick={() => this.onRemove(i)}
                >
                  delete
                </i>
                {/* </div> */}
              </div>
            ))}
        </div>
      </div>
    );
    // eslint-disable-next-line
    ImageData = (
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="login-form">
            <form>
              <div className="form-group">
                <label for="exampleInputEmail1">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Full Name"
                  required
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label for="exampleinputinstitution">Institution</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleinputinstitution"
                  aria-describedby="emailHelp"
                  placeholder="Enter Institution"
                  name="institution"
                  value={this.state.institution}
                  onChange={this.handleChange}
                  required
                />
              </div>
              {Upload}
              {Preview}

              <button
                type="button"
                className="btn btn-primary"
                onClick={() => this.Next()}
              >
                Next
              </button>
            </form>
          </div>
        </div>
      </div>
    );
    return (
      <div className="container">
        {!this.state.next ? (
          ImageData
        ) : (
          <>
            <App screenshot={screenshot} data={this.state} />
            <div style={{ width: "50%" }} className="mx-auto">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => this.Prev()}
              >
                Back
              </button>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default GetImage;
