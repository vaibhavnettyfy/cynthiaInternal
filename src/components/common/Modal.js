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
import CheckFeature from '../modal/CheckFeature';
import SwitchAccount from '../modal/SwitchAccount';

export default function CommonModal({ handleClose, modalOpen }) {
    const router = useRouter();
    const notallowedRoutes = ['planEnd', 'subscriptionIssue', 'paymenentPending','checkFeature']

    return (
        <Dialog
            onClose={!notallowedRoutes.includes(modalOpen.currentComponent) ? handleClose : null}
            aria-labelledby="Common_modal"
            open={modalOpen.open}
            sx={{
                "& .MuiDialog-container": {
                    marginLeft: modalOpen.currentComponent == 'checkFeature' ? "80px !important" : '',
                },
                "& .MuiBackdrop-root ": {
                    left: modalOpen.currentComponent == 'checkFeature' ? "80px" : '',
                },
            }}
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
            {modalOpen.currentComponent === 'checkFeature' && <CheckFeature handleClose={handleClose} modalOpen={modalOpen} />}
            {modalOpen.currentComponent === 'switchAccount' && <SwitchAccount handleClose={handleClose} modalOpen={modalOpen} />}
        </Dialog>
    );
}
