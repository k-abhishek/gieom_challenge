import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class BeerType extends React.Component {
  state = {
    anchorEl: null,
    selectedItem: ''
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = event => {
    this.props.onSelectItem(event.target.textContent)
    this.setState({ anchorEl: null, selectedItem: event.target.textContent });
  };

  render() {
    const { anchorEl, selectedItem } = this.state;

    return (
      <div>
        <Button
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          {selectedItem ===""?`Beer Style`:`Beer Style: ${selectedItem}`}  
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}>Lager</MenuItem>
          <MenuItem onClick={this.handleClose}>ale</MenuItem>
          <MenuItem onClick={this.handleClose}>IPA</MenuItem>
        </Menu>
      </div>
    );
  }
}

export default BeerType;
