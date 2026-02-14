import { Box, Button } from '@mui/material';

const Pagination = ({ page, setPage, totalPages }) => (
  <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
    <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
      Previous
    </Button>
    <span style={{ margin: '0 1rem' }}>
      Page {page} of {totalPages}
    </span>
    <Button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
      Next
    </Button>
  </Box>
);
export default Pagination;