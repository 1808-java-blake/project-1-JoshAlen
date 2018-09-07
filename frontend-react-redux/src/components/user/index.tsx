import * as React from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { StatusFilter } from './statusFilter';

export default class User extends React.Component<any, any> {
        public constructor(props: any){
            super(props);
            this.state = {
                currentReimb: [],
                currentUser: {},
                users: []
            }
        }

        public componentDidMount(){
            fetch('http://localhost:9001/users')
            .then(resp => resp.json())
            .then(users => {
                this.setState({users})
                console.log(this.state.users);
            })
            .catch(err => {
                console.log(err);
            }) 
        }

        public getFilterBy = (filter: number) => {
            this.setState({filter});
        }

        public getViewBtnClickIndex = (e: any) => {
           e.preventDefault();
           const i = e.target.value;
           const currentUser = this.state.users[i];
           this.setState({
               currentReimb: currentUser.Reimbursement,
               currentUser
            });
        }

        public renderUsers = (): any => {
            return (this.state.users.length > 0) &&
                    this.state.users.map((u: any, index: number) => {
                    return (u.Reimbursement.length > 0) &&
                        <tr key={index}>
                            <td>{u.ersUsersId}</td>
                            <td>{u.ersUserFirstName}</td>
                            <td>{u.ersUserLastName}</td>
                            <td>{u.ersUserEmail}</td>
                            <td className="text-center">
                                <button value={index} onClick={this.getViewBtnClickIndex}className="btn btn-default btn-xs text-white">View</button>
                            </td>
                        </tr>
                    }) 
        }

        public printStatusBadge = (i: number): any => {
            switch(i){
                case 0:
                    return <span className="badge badge-dark">pending</span>;
                case 1: 
                    return <span className="badge badge-light">Approved</span>;
                case 2: 
                    return <span className="badge badge-warning">Denied</span>;
                default:
                    return null;
            }   
        }

        public renderReimb = (): any => {
            return (this.state.currentReimb.length > 0) &&
                    this.state.currentReimb.map((r: any, index: number) => {
                    return <tr key={index}>
                                <td>{r.reimbId}</td>
                                <td>{r.reimbAmount}</td>
                                <td>{r.reimbSubmitted}</td>
                                <td>{r.reimbDescription}</td>
                                <td>{this.printStatusBadge(r.reimbStatusId)}</td>
                                <td className="text-center">
                                    <button value={index} className='btn btn-success btn-xs text-white mr-1' onClick={this.setApprove}>
                                        <FaCheck/>
                                    </button> 
                                    <button value={index} className="btn btn-danger btn-xs text-white" onClick={this.setDeny}>
                                        <FaTimes/>
                                    </button>
                                </td>
                            </tr>
                    }) 
        }

        public setApprove = (e: any) => {
            e.preventDefault();
            const deny = {
                "reimbId": this.state.currentReimb[e.currentTarget.value].reimbId,
                "reimbResolver": this.state.currentUser.ersUsersId,
                "reimbStatusId": 1
              }
              
              fetch('http://localhost:9001/reimbursements/approve', {
                body: JSON.stringify(deny),
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                method: 'POST'
              })
              .then(resp => resp.json())
              .then(resp => {
                  console.log(resp);
              })
              .catch(err => {
                console.log(err);
              });
        }
        
        public setDeny = (e: any) => {
            e.preventDefault();
            const approve = {
                "reimbId": this.state.currentReimb[e.currentTarget.value].reimbId,
                "reimbResolver": this.state.currentUser.ersUsersId,
                "reimbStatusId": 2
              }
              
              fetch('http://localhost:9001/reimbursements/deny', {
                body: JSON.stringify(approve),
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                method: 'POST'
              })
              .then(resp => resp.json())
              .catch(err => {
                console.log(err);
              });
        }
        
        public render() {
            return ( <div className="container-fluid">
                        <StatusFilter filterBy={this.getFilterBy} />
                        <div className="row">
                            <table className="table table-striped custab col-md-5 custyle m-2">
                            <thead>
                                <tr>
                                    <th>Emp. ID</th>
                                    <th>Firstname</th>
                                    <th>Lastname</th>
                                    <th>Email</th>
                                    <th className="text-center">Action</th>
                                </tr>
                            </thead>
                                <tbody>
                                    { this.renderUsers() }
                                </tbody>
                            </table>
                        
                        <table className="table table-striped custab col-md-6 custyle m-2">
                            <thead>
                                <tr>
                                    <th>Reimb. ID</th>
                                    <th>Amount</th>
                                    <th>Date Submitted</th>
                                    <th>Description</th>
                                    <th>Status</th>
                                    <th className="text-center">Action</th>
                                </tr>
                            </thead>
                                <tbody>
                                    { this.renderReimb() }
                                </tbody>
                            </table>
                        </div>
                    </div>
            )
        }
}

