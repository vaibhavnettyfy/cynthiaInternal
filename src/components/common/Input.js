import React from "react";
import TextField from "@mui/material/TextField";
import { Box, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import EmailIcon from "@mui/icons-material/Email";

const CommonInput = (props) => {
  const {
    type,
    placeholder,
    passwordInput,
    iconsInput,
    inputProps,
    labelInput,
    labelColor,
    error,
    formik,
    variant,
    labal,
    name,
    onChange,
    value,
    disabled,
  } = props;
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  return (
    <div>
      {labelInput && (
        <Typography
          fontSize={"12px"}
          fontWeight={500}
          marginBottom={"6px"}
          sx={{ color: "#080a0b" }}
          color={labelColor}
        >
          {labal}
        </Typography>
      )}
      {passwordInput ? (
        <div className="p_relative">
          <TextField
            autoComplete="off"
            fullWidth
            hiddenLabel
            disabled={disabled}
            variant={variant ? variant : "outlined"}
            placeholder={placeholder}
            value={value}
            name={name}
            onChange={onChange}
            inputProps={inputProps}
            error={error}
            // helperText={props?.formik?.errors[props.name]}
            {...props?.formik?.getFieldProps(props.name)}
            {...props}
            type={showPassword ? "text" : "password"}
          />
          <InputAdornment position="end" className="eye_btn">
            {iconsInput ? (
              <IconButton aria-label="toggle password visibility" edge="end">
                {iconsInput}
              </IconButton>
            ) : (
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? (
                  <VisibilityOff sx={{ width: "16px", height: "16px" }} />
                ) : (
                  <Visibility sx={{ width: "16px", height: "16px" }} />
                )}
              </IconButton>
            )}
          </InputAdornment>
        </div>
      ) : iconsInput ? (
        <div className="p_relative">
          <TextField
            autoComplete="off"
            fullWidth
            hiddenLabel
            disabled={disabled}
            variant={variant ? variant : "outlined"}
            placeholder={placeholder}
            value={value}
            name={name}
            onChange={onChange}
            inputProps={inputProps}
            error={error}
            type={type || "email"}
            // helperText={props?.formik?.errors[props.name]}
            {...props?.formik?.getFieldProps(props.name)}
            {...props}
          />
          <InputAdornment position="end" className="eye_btn">
            <IconButton aria-label="toggle password visibility" edge="end">
              {iconsInput ? (
                iconsInput
              ) : (
                <EmailIcon sx={{ width: "16px", height: "16px" }} />
              )}
            </IconButton>
          </InputAdornment>
        </div>
      ) : (
        <TextField
          autoComplete="off"
          fullWidth
          hiddenLabel
          disabled={disabled}
          variant={variant ? variant : "outlined"}
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={onChange}
          inputProps={inputProps}
          error={error}
          type={type || "text"}
          // helperText={props?.formik?.errors[props.name]}
          {...props?.formik?.getFieldProps(props.name)}
          {...props}
        />
      )}
      <Box fontSize={'0.75rem'} fontWeight={'400'} mx={'14px'} color={'rgba(0, 0, 0, 0.5)'} mt={'3px'}>{props?.formik?.errors[props.name]}</Box>
    </div>
  );
};

export default CommonInput;

//    {/* <div className="p_relative"> */}
//    <InputAdornment position="end" className="eye_btn">
//    <IconButton
//      aria-label="toggle password visibility"
//      edge="end"
//    >
//      {/* <EmailIcon sx={{ width: '16px', height: '16px' }} /> */}
//    </IconButton>
//  </InputAdornment>
//  </div>
