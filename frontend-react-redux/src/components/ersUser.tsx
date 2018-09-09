import * as React from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { connect } from 'react-redux';
import { getUsersAndReimbs, getCurrentUserAndReimb, updateReimbStatus } from '../actions/ersUserActions';
import StatusFilter from './statusFilter';
import { toCurrency, formatTime, stringTruncate, getReimbType, filterReimb } from '../utils';
import { Link } from 'react-router-dom';

class ErsUser extends React.Component<any, any> {

    public componentDidMount() {
        this.props.getUsersAndReimbs();
    }

    public getViewBtnClickIndex = (e: any) => {
        e.preventDefault();
        const i = e.target.value;
        const currentUser = this.props.users[i];
        this.props.getCurrentUserAndReimb(currentUser);
    }

    public renderUsers = (): any => {
        return (this.props.users.length > 0) &&
            this.props.users.map((u: any, index: number) => {
                return (u.Reimbursement.length > 0) && filterReimb(u.Reimbursement, this.props.filterBy) &&
                    <tr key={index}>
                        <td>00{u.ersUsersId}</td>
                        <td>{u.ersUserFirstName}</td>
                        <td>{u.ersUserLastName}</td>
                        <td>{u.ersUserEmail}</td>
                        <td className="text-center">
                            <button value={index} onClick={this.getViewBtnClickIndex} className="btn btn-default btn-xs text-white">View</button>
                        </td>
                    </tr>
            })
    }

    public renderReimb = (): any => {
        return (this.props.currentReimb.length > 0) &&
            this.props.currentReimb.map((r: any, index: number) => {
                return <tr key={index} className={(r.reimbStatusId === this.props.filterBy) ? '' : 'd-none'}>
                    <td>00{r.reimbId}</td>
                    <td>${toCurrency(r.reimbAmount)}</td>
                    <td>{formatTime(r.reimbSubmitted)}</td>
                    <td>{getReimbType(r.reimbTypeId)}</td>
                    <td>{stringTruncate(r.reimbDescription)}</td>
                    <td>{this.printStatusBadge(r.reimbStatusId)}</td>
                    <td className="text-center">
                        <button value={index} name="1" className='btn btn-success btn-xs text-white mr-1' onClick={this.setStatus}>
                            <FaCheck />
                        </button>
                        <button value={index} name="2" className="btn btn-danger btn-xs text-white" onClick={this.setStatus}>
                            <FaTimes />
                        </button>
                    </td>
                </tr>
            })
    }

    public setStatus = (e: any) => {
        e.preventDefault();
        const r = {
            "reimbId": this.props.currentReimb[e.currentTarget.value].reimbId,
            "reimbResolver": this.props.signinUser.ersUsersId,
            "reimbStatusId": Number(e.currentTarget.name)
        }

        this.props.updateReimbStatus(r, Number(e.currentTarget.value), Number(e.currentTarget.name));
    }

    public printStatusBadge = (i: number): any => {
        switch (i) {
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

    public authUser = (): any => {
        if (this.props.signinUser.ersUsersId) {
            return <div className="container-fluid">
                <div className="row mb-3">
                    <div className="container-fluid">
                        <StatusFilter />
                    </div>
                </div>

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
                            {this.renderUsers()}
                        </tbody>
                    </table>
                    <table className="table table-striped custab col-md-6 custyle m-2">
                        <thead>
                            <tr>
                                <th>Reimb. ID</th>
                                <th>Amount</th>
                                <th>Submitted</th>
                                <th>Type</th>
                                <th>Desc.</th>
                                <th>Status</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderReimb()}
                        </tbody>
                    </table>
                </div>
            </div>
        }
        return <div>Nothing is here... <Link to='/login' className="btn btn-primary"> Home </Link></div>
    }

    public render() {
        return (this.authUser())
    }
}

const mapStateToPros = (state: any) => ({
    currentReimb: state.user.currentReimb,
    currentUser: state.user.currentUser,
    filterBy: state.filter.filterBy,
    signinUser: state.signIn.signinUser,
    users: state.user.users
});

export default connect(mapStateToPros, { getUsersAndReimbs, getCurrentUserAndReimb, updateReimbStatus })(ErsUser);