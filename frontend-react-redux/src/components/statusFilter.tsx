import * as React from 'react';

export class StatusFilter extends React.Component<any, any>{
    
    public constructor(props: any){
        super(props);
        this.state = {
            activeTabClassName: "tab2",
        }
    }

    public activeTab = (tab: string): string => {
        return this.state.activeTabClassName === tab ? "active revature-color" : " ";  
    }

    public onClick = (e: any) => {
        const temp = e.target.className.includes("active");
        !temp ? this.setState({activeTabClassName: e.target.id}) : console.log("same tab");
    }

    public render(): any{
        return (
        <ul className="nav nav-tabs">
            <li className="nav-item">
                <a id='tab1' className={`nav-link ${this.activeTab("tab1")}`} onClick={this.onClick}>All</a>
            </li>
            <li className="nav-item">
                <a id='tab2' className={`nav-link ${this.activeTab("tab2")}`} onClick={this.onClick}>Pending</a>
            </li>
            <li className="nav-item">
                <a id='tab3' className={`nav-link ${this.activeTab("tab3")}`} onClick={this.onClick}>Approved</a>
            </li>
            <li className="nav-item">
                <a id='tab4' className={`nav-link ${this.activeTab("tab4")}`} onClick={this.onClick}>Denied</a>
            </li>
        </ul>
        )
    }
}