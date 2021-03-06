import * as React from 'react';

export class NewReimb extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            amount: 0,
            description: '',
            type: '0'
        }
    }

    public onChange = (e: any) => {
        this.setState({ [e.target.name]: e.target.value })
        console.log(e.target.value)
    }

    public onSubmit = (e: any) => {
        e.preventDefault();
        const r = {
            "reimbAmount": Number(this.state.amount),
            "reimbAuthur": localStorage.getItem("id"),
            "reimbDescription": this.state.description,
            "reimbTypeId": Number(this.state.type)
        }
        fetch('http://ec2-18-191-35-25.us-east-2.compute.amazonaws.com:3000/reimbursements', {
            body: JSON.stringify(r),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
            .then(resp => resp.json())
            .then(reimb => {
                this.props.history.push('/expensereimbursements');
                console.log(reimb);
            })
            .catch(err => {
                console.log(err);
            });

    }

    public render(): any {
        return (
            <div>
                <h2>New Expense Reimbursement</h2>
                <hr />
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Expense Amount*</label>
                        <input type="number" name="amount" value={this.state.amount} onChange={this.onChange} className="form-control" required />
                    </div>

                    <div className="form-group">
                        <label>Expense Type*</label>
                        <select className="form-control" name="type" onChange={this.onChange} required>
                            <option value="0">Lodging</option>
                            <option value="1">Travel</option>
                            <option value="2">Food</option>
                            <option value="3">Other</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Expense Description*</label>
                        <textarea className="form-control" name="description" value={this.state.description} onChange={this.onChange} rows={3} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="exampleInputFile">Expense Receipt</label>
                        <input type="file" className="form-control-file" id="expenseReceipt" aria-describedby="fileHelp" />
                        <small id="fileHelp" className="form-text text-muted">for faster expense reimbursement, please submit your expense receipt either a scan or photocopy of the receipt.</small>
                    </div>

                    <button type="submit" className="btn btn-default text-white btn-block float-right">Submit</button>
                </form>
            </div>
        )
    }
}