import { useState, useContext, useEffect } from 'react';
import FeedbackContext from '../context/FeedbackContext';
import Card from './shared/Card';
import Button from './shared/Button';
import RatingSelect from './RatingSelect';


const FeedbackForm = () => {

	const [text, setText] = useState('');
	const [rating, setRating] = useState(10);
	const [btnDisabled, setBtnDisabled] = useState(true);
	const [message, setMessage] = useState('');
	const { addFeedback, feedbackEdit, updateFeedback } = useContext(FeedbackContext);

	const handleTextChange = (e) => {
		if (text === '') {
			setBtnDisabled(true);
			setMessage(null);
		} else if (text !== '' && text.trim().length <= 10) {
			setBtnDisabled(true);
			setMessage('Text must be at least 10 characters');
		} else {
			setMessage(null);
			setBtnDisabled(false);
		}
		setText(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (text.trim().length > 10) {
			const newFeedback = {
				text,
				rating
			}
			if (feedbackEdit.edit === true) {
				updateFeedback(feedbackEdit.item.id, newFeedback);
				setText('');
			} else {
				addFeedback(newFeedback);
				setText('');
			}
		}
	};

	useEffect(() => {
		if (feedbackEdit.edit === true) {
			setBtnDisabled(false);
			setText(feedbackEdit.item.text);
			setRating(feedbackEdit.item.rating);
		}
	}, [feedbackEdit])

	return (
		<Card>
			<form onSubmit={handleSubmit}>
				<h2>How would you rate your service with us?</h2>
				<RatingSelect
					select={(rating) => setRating(rating)}
				/>
				<div className='input-group'>
					<input
						value={text}
						onChange={handleTextChange}
						type='text'
						placeholder='Write a review'
					/>
					<Button type='submit' isDisabled={btnDisabled}>
						Send
					</Button>
				</div>

				{message && (
					<div className='message'>{message}</div>
				)}
			</form>
		</Card>
	);
};

export default FeedbackForm;
