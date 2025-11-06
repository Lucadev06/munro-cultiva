import { Dialog, DialogContent } from "@mui/material";

const LoginDialog = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
        <DialogContent>
            {/* Aquí va el contenido del modal de login */}
        </DialogContent>    
    </Dialog>
  );
}
export default LoginDialog;