import React, { Component } from 'react';
import './styles.css';

class Reviews extends Component {
	state = {
		text: '',
		// Hard coding, users list.
		users: [
			{ value: 'dayoung', id: 1 },
			{ value: 'hyunsu', id: 2 },
			{ value: 'hyoin', id: 3 },
			{ value: 'johnny', id: 4 },
			{ value: 'ilmo', id: 5 }
		],
		showItems: false,
		currentUser: {} //in dropbox, it will show as an empty selection.
	};

	sendReview() {
		fetch('http://127.0.0.1:3002/api/reviews', {
			method: 'POST',
			body: JSON.stringify({
				rating: '5',
				comment: this.state.text, // simply use as this.state.foo when sending thru JSON.stringify.
				photo: 'https://media-cdn.tripadvisor.com/media/photo-s/11/a3/8e/03/caption.jpg',
				restaurantID: '1',
				userID: '1'
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((res) => {
			if (res.ok) {
				this.props.history.push(`/item/${this.props.match.params.itemId}`); //if server responses as 'ok' then it will redirect to the following path.
			} else {
				alert('Please try again :-)'); // if error occurs then it will send error message.
			}
			console.log(res);
		});
	}

	//deleted onSubmit function() instead using sendReview() to fethch post request. In order word, after clicking on submit button it will return with responses(true or false).

	dropDown = () => {
		this.setState((prevState) => ({
			showItems: !prevState.showItems
		}));
	};

	selectUser = (user) =>
		this.setState({
			currentUser: user, //After onClick(dropDown), currentUser will have users value.
			showItems: false
		});

	render() {
		//{history] method is acceptable ,but if there is specific url(in this case restaurant_id) that links to review page (same as going back to previouse job) ,client can go back
		//to the previous item page.
		// const { history, match } = this.props;
		const { currentUser } = this.state;
		return (
			<div style={{ margin: '16px', position: 'relative' }}>
				<div className="select-box--box" style={{ width: this.props.width || 180 }}>
					<div className="select-box--container">
						{currentUser && <div className="select-box--selected-item"> {currentUser.value}</div>}
						<div className="select-box--arrow" onClick={this.dropDown}>
							<span
								className={`${this.state.showItems
									? 'select-box--arrow-up'
									: 'select-box--arrow-down'}`}
							/>
						</div>
						<div style={{ display: this.state.showItems ? 'block' : 'none' }} className="select-box--item">
							{this.state.users.map((user) => (
								<div
									key={user.id}
									onClick={() => this.selectUser(user)}
									className={this.state.selectUser === user ? 'selected' : ''}
								>
									{user.value}
								</div>
							))}
						</div>
						<div>
							<br />
							<textarea
								placeholder="write your review"
								value={this.state.text}
								onChange={(e) => {
									this.setState({ text: e.target.value });
								}}
							/>
							<br />
							{/*Deleted onClick function, will replace by sendingReivew method() to request 'post' to server.*/}
							<button
								onClick={() => {
									this.sendReview();
									// history.push(`/item/${match.params.itemId}`);
								}}
							>
								Post Review
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Reviews;
