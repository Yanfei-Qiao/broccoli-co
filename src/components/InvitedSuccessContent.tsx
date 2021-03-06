import { Button } from 'antd';

type InvitedSuccessContentProps = {
    onOkClick:() => void
};

function InvitedSuccessContent ({ onOkClick }: InvitedSuccessContentProps) {
    return (
        <div>
            <h2>All done!</h2>
            <div className="separator"></div>
            <div>
                <p>You will be one of the first to experience</p>
                <p>Broccoli & Co. when we launch.</p>
            </div>
            <Button block onClick={onOkClick}>Ok</Button>
        </div>
    )
}

export default InvitedSuccessContent;