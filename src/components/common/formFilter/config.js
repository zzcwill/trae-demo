import InputItem from "./components/inputItem";
import CascaderItem from "./components/cascaderItem";
import CheckBoxItem from "./components/checkBoxItem";
import DatePickerItem from "./components/datePickerItem";
import RadioItem from "./components/radioItem";
import SelectItem from "./components/selectItem";
import FileUpload from "./components/fileUpload";
import TreeSelect from "./components/treeSelect";
import UEditorItem from "./components/ueditorItem";

export default {
  input: InputItem.Input_Default,
  inputSearch: InputItem.Input_Search,
  inputTextArea: InputItem.Input_TextArea,
  inputNumber: InputItem.Input_Number,
  cascader: CascaderItem,
  checkBox: CheckBoxItem,
  datePicker: DatePickerItem.DatePicker_Default,
  datePickerMonthPicker: DatePickerItem.DatePicker_MonthPicker,
  datePickerQuarterPicker: DatePickerItem.DatePicker_QuarterPicker,
  datePickerRangePicker: DatePickerItem.DatePicker_RangePicker,
  radio: RadioItem,
  select: SelectItem,
  fileUpload: FileUpload,
  treeSelect: TreeSelect,
  uEditor:UEditorItem
};
