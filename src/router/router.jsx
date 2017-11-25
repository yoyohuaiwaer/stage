 import React,{ Component } from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Index from '../component/index.jsx'
import recharge from '../component/recharge.jsx';
class RouterList extends Component {
    render() {
        return(
            <Router>
                <div>
                    <ul className="nav">
                        <li><Link to="/">我的帐户</Link></li>
                        <li><Link to="/recharge">银行充提</Link></li>
                        <li><Link to="/record">投注记录</Link></li>
                        <li><Link to="/report">帐户报表</Link></li>
                        <li><Link to="/proxy">代理管理</Link></li>
                        <li><Link to="/activities">优惠活动</Link></li>
                        <li><Link to="/culture">企业文化</Link></li>
                    </ul>
                    <Route exact path="/" component={Index} />
                    <Route path="/recharge" component={recharge} />
                </div>  
            </Router>
        )
    }
}
export default RouterList
