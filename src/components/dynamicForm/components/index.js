import TextArea from './textArea';
import Card from './card';
import Container from './container';
import Select from './select';
import Divider from './divider';
import Text from './text';
import DatePicker from './datepicker';
import InputNumber from './inputNumber';

const components = {
  TextArea,
  Select,
  Text,
  DatePicker,
  CustomInputNumber:InputNumber,
}

export const virtualFields = {
  Card,
  Container,
  Divider,
}

export default components;
