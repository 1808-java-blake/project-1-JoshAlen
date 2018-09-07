import * as React from 'react';
import { connect } from 'react-redux';
import { getUserAndReimb } from '../actions/ersUserActions';

class ErsUser extends React.Component<any, any> {

        public componentDidMount(){
            console.log("getting users")
            this.props.getUserAndReimb();
        }

        public renderUsers = (): any => {
            return (this.props.users.length > 0) &&
                    this.props.users.map((u: any, index: number) => {
                    return (u.Reimbursement.length > 0) &&
                        <tr key={index}>
                            <td>{u.ersUsersId}</td>
                            <td>{u.ersUserFirstName}</td>
                            <td>{u.ersUserLastName}</td>
                            <td>{u.ersUserEmail}</td>
                            <td className="text-center">
                                <button value={index} className="btn btn-default btn-xs text-white">View</button>
                            </td>
                        </tr>
                    }) 
        }

        public render() {
            return ( <div className="container-fluid">
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
                        </div>
                    </div>
            )
        }
}

const mapStateToPros = (state: any) => ({
    users: state.user.users
});

export default connect(mapStateToPros, { getUserAndReimb })(ErsUser);