import React from 'react';
import { connect } from 'react-redux';

import { setFilter } from '../../actions/actions';

function VisibilityFilterInput(props) {
	return (
		<div className="filter-input-container">
			<input
				onChange={(e) => props.setFilter(e.target.value)}
				value={props.visibilityFilter}
				placeholder="Search by movie title:"
			/>
		</div>
	);
}

export default connect(null, { setFilter })(VisibilityFilterInput);
