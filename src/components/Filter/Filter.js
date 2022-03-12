import { Label, Search } from './Filter.styled';

const Filter = ({ value, onChange }) => (
  <Label>
    Filter by name:
    <Search type="text" value={value} onChange={onChange} />
  </Label>
);

export default Filter;
