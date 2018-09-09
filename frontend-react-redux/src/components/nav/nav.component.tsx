import * as React from 'react';
import { Link } from 'react-router-dom';
import RevLogo from '../../assets/rev-logo.png';
import { IState } from '../../reducers';
import { connect } from 'react-redux';
import { FaUser, FaPencilAlt, FaMoneyBill } from 'react-icons/fa';
import * as signInActions from '../../actions/sign-in/sign-in.actions';
import { toUpperCaseFirstLetter } from '../../utils';

class AppNav extends React.Component<any, any> {

  public onClick = (e: any) => {
    console.log(e.target);
    this.props.setLoginUser({});
    this.props.updateUsername('');
    this.props.updatePassword('');
  }

  public renderLoginLinks = ():any => {
      return ( 
       <ul className="navbar-nav ml-auto margin-nav">
         <li className="nav-item">
           <Link to="/reimbursements" className="unset-anchor nav-link"><FaPencilAlt/> Create New Expense</Link>
         </li>
         <li className="nav-item">
           <Link to="/expensereimbursements" className="unset-anchor nav-link"><FaMoneyBill/> Expense Reimbursements</Link>
         </li>
         <li className="nav-item dropdown">
           
           <a className="nav-link dropdown-toggle pointer" id="examples-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
           <FaUser/> { toUpperCaseFirstLetter(this.props.signinUser.ersUserFirstName) + ' ' + toUpperCaseFirstLetter( this.props.signinUser.ersUserLastName )}
           </a>
           
           <div className="dropdown-menu" aria-labelledby="examples-dropdown">
             <div className="dropdown-item"><Link to="/login" onClick={this.onClick} className="unset-anchor nav-link">Logout</Link></div>
           </div>
         </li>
      </ul> )
  }

  public render(){
    return ( 
    <div>
      <nav className="navbar navbar-toggleable-md navbar-expand-lg navbar-light bg-light display-front nav-pad">
        <div className="navbar-header c-pointer shift-left">
          <Link to="/" className="unset-anchor">
            <img className="img-adjust-position rev-logo" src={RevLogo} alt="revature" />
          </Link>
        </div>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarsExample04">
            { (this.props.signinUser.ersUsersId) ? this.renderLoginLinks() : null }
        </div>
      </nav>
    </div >
  );
  }
}

const mapStateToProps = (state: IState) => (state.signIn)
const mapDispatchToProps = {

  setLoginUser: signInActions.setLoginUser,
  updateError: signInActions.updateError,
  updatePassword: signInActions.updatePassword,
  updateUsername: signInActions.updateUsername

}

export default connect(mapStateToProps, mapDispatchToProps)(AppNav);