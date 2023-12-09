import { render, screen } from '@testing-library/react';
import Missing from './Missing';

describe('Should render 404 page', () => {
	test('Should render Error 404', () => {
		render(<Missing />);
		const text = screen.getByText('Error 404');
		expect(text).toBeInTheDocument();
	});
});
