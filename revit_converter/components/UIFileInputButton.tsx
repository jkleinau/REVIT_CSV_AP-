import React from 'react';
export interface IProps {
	acceptedFileTypes?: string;
	allowMultipleFiles?: boolean;
	label: string;
	onChange: (formData: FormData) => void;
	uploadFileName: string;
}

export const UiFileInputButton: React.FC<IProps> = (props) => {
	const fileInputRef = React.useRef<HTMLInputElement | null>(null);
	const formRef = React.useRef<HTMLFormElement | null>(null);

	const onClickHandler = () => {
		fileInputRef.current?.click();
	};

	const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files?.length) {
			return;
		}

		const formData = new FormData();

		Array.from(event.target.files).forEach((file) => {
			formData.append(event.target.name, file);
		});

		props.onChange(formData);

		formRef.current?.reset();
	};

	return (
		<form ref={formRef} className='items-center w-64 mx-auto text-3xl'>
			<button
				type='button'
				className='px-4 py-2 rounded border-2 m-4 hover:bg-white hover:text-indigo-600'
				onClick={onClickHandler}
			>
				{props.label}
			</button>
			<input
				accept={props.acceptedFileTypes}
				multiple={props.allowMultipleFiles}
				name={props.uploadFileName}
				onChange={onChangeHandler}
				ref={fileInputRef}
				style={{ display: 'none' }}
				type='file'
			/>
		</form>
	);
};

UiFileInputButton.defaultProps = {
	acceptedFileTypes: '',
	allowMultipleFiles: false,
};
