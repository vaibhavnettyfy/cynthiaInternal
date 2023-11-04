import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import UploadModal from '../uploadIntegration/modal/UploadModal';
import PlayStoreConnect from '../uploadIntegration/modal/PlayStoreConnect';
import InviteMember from '../settings/sections/modal/InviteMember';
import InfoCynthia from '../askcynthia/InfoCynthia';
import Remove from '../modal/Remove';
import EditFile from '../modal/EditFile';
import PlanEnd from '../modal/PlanEnd';
import { useRouter } from "next/navigation";
import PaymenentPending from '../modal/PaymenentPending';
import SubscriptionIssue from '../modal/SubscriptionIssue';

export default function CommonModal({ handleClose, modalOpen }) {
    const router = useRouter();
    const handleBackdropClick = () => {
        // Check if the currentComponent is one of the specified values
        if (
            ['planEnd', 'subscriptionIssue', 'paymenentPending'].includes(
                modalOpen.currentComponent
            )
        ) {
            // Redirect to the login page
            router.push('/'); // Update '/login' with the appropriate login page route
        }
    };

    return (
        <Dialog
            onClose={handleClose}
            onBackdropClick={handleBackdropClick}
            aria-labelledby="Common_modal"
            open={modalOpen.open}
        >
            {modalOpen.currentComponent === 'remove' && <Remove handleClose={handleClose} modalOpen={modalOpen} />}
            {modalOpen.currentComponent === 'editFile' && <EditFile handleClose={handleClose} modalOpen={modalOpen} />}
            {modalOpen.currentComponent === 'uploadFile' && <UploadModal handleClose={handleClose} modalOpen={modalOpen} />}
            {modalOpen.currentComponent === 'playstore' && <PlayStoreConnect handleClose={handleClose} modalOpen={modalOpen} />}
            {modalOpen.currentComponent === 'inviteMember' && <InviteMember handleClose={handleClose} modalOpen={modalOpen} />}
            {modalOpen.currentComponent === 'infoCynthia' && <InfoCynthia handleClose={handleClose} modalOpen={modalOpen} />}
            
            {modalOpen.currentComponent === 'planEnd' && <PlanEnd handleClose={handleClose} modalOpen={modalOpen} />}
            {modalOpen.currentComponent === 'paymenentPending' && <PaymenentPending handleClose={handleClose} modalOpen={modalOpen} />}
            {modalOpen.currentComponent === 'subscriptionIssue' && <SubscriptionIssue handleClose={handleClose} modalOpen={modalOpen} />}
        </Dialog>
    );
}
