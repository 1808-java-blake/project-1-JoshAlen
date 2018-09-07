import * as React from 'react';
import { Link } from 'react-router-dom';
import RevLogo from '../../assets/rev-logo.png';
import { IState } from '../../reducers';
import { connect } from 'react-redux';

const AppNav: React.StatelessComponent<any> = (props) => {
  return (
    <div>
      <nav className="navbar navbar-toggleable-md navbar-expand-lg navbar-light bg-light display-front nav-pad">
        <div className="navbar-header c-pointer shift-left">
          <Link to="/home" className="unset-anchor">
            <img className="img-adjust-position rev-logo" src={RevLogo} alt="revature" />
          </Link>
        </div>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarsExample04">
          <ul className="navbar-nav ml-auto margin-nav">
            <li className="nav-item active">
              <Link to="/expensereimbursements" className="unset-anchor nav-link">Expense Reimbursements</Link>
            </li>
            {/* <li className="nav-item active">
              <Link to="/first" className="unset-anchor nav-link">First</Link>
            </li> */}
            <li className="nav-item active dropdown">
              <a className="nav-link dropdown-toggle pointer" id="examples-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Examples</a>
              <div className="dropdown-menu" aria-labelledby="examples-dropdown">
                <div className="dropdown-item"><Link to="/login" className="unset-anchor nav-link active">Logout</Link></div>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </div >
  );
}

const mapStateToProps = (state: IState) => (state)
export default connect(mapStateToProps)(AppNav);