import * as React from 'react';

export class NewReimb extends React.Component<any, any>{

    public render(): any{
        return (
            <div>
                <h2>New Expense Reimbursement</h2>
                <hr/>
                <form>
                    <div className="form-group">
                        <label>Expense Amount*</label>
                        <input type="number" className="form-control" id="expenseAmount" aria-describedby="emailHelp" placeholder="Enter expense amount $" required/>
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>

                    <div className="form-group">
                        <label>Expense Type*</label>
                        <select className="form-control" id="expenseType" required>
                            <option>Lodging</option>
                            <option>Travel</option>
                            <option>Food</option>
                            <option>Other</option>
                        </select>
                    </div>

                <div className="form-group">
                <label>Expense Description*</label>
                <textarea className="form-control" id="expenseDescription" rows={3} required></textarea>
                </div>
                <div className="form-group">
                <label htmlFor="exampleInputFile">Expense Receipt</label>
                <input type="file" className="form-control-file" id="expenseReceipt" aria-describedby="fileHelp"/>
                <small id="fileHelp" className="form-text text-muted">for faster expense reimbursement, please submit your expense receipt either a scan or photocopy of the receipt..</small>
                </div>
                <button type="submit" className="btn btn-default text-white btn-block float-right">Submit</button>
            </form>
          </div>
        )
    }
}