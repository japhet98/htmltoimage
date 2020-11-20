import React, { Component } from "react";

class UploadImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
      urls: [],
      isDragging: false,
    };

    this.onChange = this.onChange.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleDragEnter = this.handleDragEnter.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDragLeave = this.handleDragLeave.bind(this);
    this.handleFiles = this.handleFiles.bind(this);
    this.onRemove = this.onRemove.bind(this);
  }

  onRemove(index) {
    var { files, urls } = this.state;
    let newFiles = files.filter((file, i) => i !== index);
    let newUrls = urls.filter((url, i) => i !== index);

    this.setState({
      ...this.state,
      files: newFiles,
      urls: newUrls,
    });
  }

  handleDrags(e) {
    e.preventDefault();
    e.stopPropagation();

    this.setState({
      ...this.state,
      isDragging: true,
    });
  }

  handleDragEnter(e) {
    this.handleDrags(e);
  }

  handleDragOver(e) {
    this.handleDrags(e);
  }

  handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();

    this.setState({
      ...this.state,
      isDragging: false,
    });
  }

  onChange(e) {
    e.preventDefault();
    const files = e.target.files;
    [].forEach.call(files, this.handleFiles);
  }

  handleDrop(e) {
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
  }

  handleFiles(file) {
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
  }

  render() {
    const { urls, files, isDragging } = this.state;
    const dropClass = isDragging ? "dragDrop dragging" : "dragDrop";
    const Upload = (
      <div className="uploadInput">
        <input type="file" onChange={this.onChange} accept="image/*" multiple />
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

    Preview = (
      <div className="imagePreviewContainer">
        {urls &&
          urls.map((url, i) => (
            <div className="previewItem">
              <img className="imagePreview" src={url} />
              <div className="details">
                <h6>{files[i].name}</h6>
                <h6>{files[i].size.toLocaleString()} KBs</h6>
                <h6>{files[i].type}</h6>
                <i className="material-icons" onClick={() => this.onRemove(i)}>
                  delete
                </i>
              </div>
            </div>
          ))}
      </div>
    );
    return (
      <div className="container">
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
                  />
                </div>

                <div class="row">
                  <div class="col-lg-6 col-md-6 col-sm-6 imgUp mx-auto text-center">
                    <div class="imagePreview"></div>
                    <label class="btn btn-primary">
                      Upload
                      <input
                        type="file"
                        class="uploadFile img"
                        style={{
                          width: "0px",
                          height: "0px",
                          overflow: "hidden",
                        }}
                      />
                    </label>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UploadImage;
