import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ search, setSearch, setPage }) => {
  const handleChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };
  return (
    <TextField
      label="Search by name or email"
      variant="outlined"
      size="small"
      fullWidth
      margin="normal"
      value={search}
      onChange={handleChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};
export default SearchBar;