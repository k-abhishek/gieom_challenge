import React, { Component } from 'react'
import { EnhancedTable } from './../../components/index'
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios'
import  LoadingGif  from './../../images/loading.gif'   
//import {Deadpool} from './../../images/importImages'
const styles = theme => ({
    control:{
        marginBottom: '1rem'
    },
    loadingImg: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '500px',
        height: '500px',
        marginTop: '-250px', /* Half the height */
        marginLeft: '-250px',/* Half the width */
    },
    tableBackgound:{
        background: 'url()'
    }
});
class HomeRouteContent extends Component {
    state= {
        loading: true,
        data:[]
    }
    componentDidMount(){
        //axios.get(`http://starlord.hackerearth.com/beercraft`,{
        axios.get(`../resp.json`,{
            headers: {
              'Access-Control-Allow-Origin': '*',
            }}).then(res => {
            this.setState({data:res.data, loading:false})
        })
    }

    render(){
        const { classes } = this.props
        const { loading, data } = this.state 
        return(
            <div>
                {loading?
                    <img src={LoadingGif} alt="loading" className={classes.loadingImg}/>
                    : <div className={classes.tableBackgound}><EnhancedTable tableData={data}/></div>
                }
            </div>
        );
    }
}

export default withStyles(styles)(HomeRouteContent)