import React from 'react';

function RecentActivity({ recentActivityList }) {
	// console.log(recentActivityList);
	return recentActivityList.map((activity) => (
		<div>
			<div>
				<span>user사진</span>
				<span>
					<div>user이름: {activity.userID}</div>
					<div>wrote a review</div>
				</span>
			</div>
			<div>레스토랑이름: {activity.restaurantID}</div>
			<div>별점: {activity.rating}</div>
			<div>코멘트: {activity.comment}</div>
		</div>
	));
}

export default RecentActivity;
