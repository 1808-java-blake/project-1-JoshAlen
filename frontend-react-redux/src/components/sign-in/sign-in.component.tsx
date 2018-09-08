import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { ISignInState, IState } from '../../reducers';
import * as signInActions from '../../actions/sign-in/sign-in.actions';
import { connect } from 'react-redux';

interface IProps extends RouteComponentProps<{}>, ISignInState {
  updateError: (message: string) => any,
  updatePassword: (password: string) => any,
  updateUsername: (username: string) => any,
  submit: (credentials: any) => any
}

class SignInComponent extends React.Component<IProps, {}> {

  constructor(props: any) {
    super(props);
  }

  public submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch('http://localhost:9001/users/login', {
      body: JSON.stringify(this.props.credentials),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
      .then(resp => {
        console.log(resp.status)
        if (resp.status === 401) {
          this.props.updateError('Invalid Credentials');
        } else if (resp.status === 200) {
          return resp.json();
        } else {
          this.props.updateError('Failed to Login at this time');
        }
        throw new Error('Failed to login');
      })
      .then(resp => {
        localStorage.setItem('user', JSON.stringify(resp));
        localStorage.setItem('id', resp.ersUsersId);
        localStorage.setItem('role', resp.ersUserRoleId);
        localStorage.setItem('name', resp.ersUserFirstName + " " + resp.ersUserLastName);
        this.props.history.push('/expensereimbursements');
      })
      .catch(err => {
        console.log(err);
      });
  }
  
  public passwordChange = (e: any) => {
    this.props.updatePassword(e.target.value);
  }

  public usernameChange = (e: any) => {
    this.props.updateUsername(e.target.value);
  }

  public render() {
    const { errorMessage, credentials } = this.props;

    return(
      <section className="login-block m-0">
        <div className="container">
          <div className="row">
            <div className="col-md-4 login-sec">
              <h2 className="text-center">Login Now</h2>
              <form className="login-form" onSubmit={this.submit}>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1" className="text-uppercase">Username</label>
                  <input onChange={this.usernameChange} value={credentials.username} type="text" id="inputUsername" className="form-control" placeholder="" required />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1" className="text-uppercase">Password</label>
                  <input onChange={this.passwordChange} value={credentials.password} type="password" id="inputPassword" className="form-control" placeholder="" required />
                </div>

                <div className="form-check">
                  <label className="form-check-label">
                    <input type="checkbox" className="form-check-input" />
                    <small>Remember Me</small>
                  </label>
                  <button type="submit" className="btn btn-login float-right">Submit</button>
                </div>
                {errorMessage && <span id="error-message">{errorMessage}</span>}
              </form>
            </div>
            <div className="col-md-8 banner-sec">
              <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                  <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                  <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                  <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner" role="listbox">
                  <div className="carousel-item active">
                    <img className="d-block img-fluid" src="https://static.pexels.com/photos/33972/pexels-photo.jpg" alt="First slide" />
                  </div>

                  <div className="carousel-item">
                    <img className="d-block img-fluid" src="https://images.pexels.com/photos/7097/people-coffee-tea-meeting.jpg" alt="First slide" />
                  </div>

                  <div className="carousel-item">
                    <img className="d-block img-fluid" src="https://images.pexels.com/photos/872957/pexels-photo-872957.jpeg" alt="First slide" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state: IState) => (state.signIn);
const mapDispatchToProps = {
  updateError: signInActions.updateError,
  updatePassword: signInActions.updatePassword,
  updateUsername: signInActions.updateUsername,
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInComponent);

