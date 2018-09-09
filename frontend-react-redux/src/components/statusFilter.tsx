import * as React from 'react';
import { connect } from 'react-redux';
import { getActiveTab } from '../actions/statusFilterActions';

class StatusFilter extends React.Component<any, any>{

    constructor(props: any) {
        super(props);
    }

    public activeTab = (tab: string): string => {
        return this.props.activeTabClassName === tab ? "active revature-color" : " ";
    }

    public onClick = (e: any) => {
        const temp = e.target.className.includes("active");
        !temp ? this.props.getActiveTab(e.target.id) : console.log("same tab");
    }

    public render(): any {
        return (
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a id='tab0' className={`nav-link ${this.activeTab("tab0")}`} onClick={this.onClick}>Pending</a>
                </li>
                <li className="nav-item">
                    <a id='tab1' className={`nav-link ${this.activeTab("tab1")}`} onClick={this.onClick}>Approved</a>
                </li>
                <li className="nav-item">
                    <a id='tab2' className={`nav-link ${this.activeTab("tab2")}`} onClick={this.onClick}>Denied</a>
                </li>
            </ul>
        )
    }
}

const mapStateToProps = (state: any) => (state.filter);
export default connect(mapStateToProps, { getActiveTab })(StatusFilter);