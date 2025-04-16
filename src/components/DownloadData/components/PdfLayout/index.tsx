import "./index.scss";
import { forwardRef } from "react";
import { TemperatureChart } from "../../../../pages/Device/components/DeviceChart/TemperatureChart";
import { HumidityChart } from "../../../../pages/Device/components/DeviceChart/HumidityChart";
import { AirPollutionChart } from "../../../../pages/Device/components/DeviceChart/AirPollutionChart";
import { GasesChart } from "../../../../pages/Device/components/DeviceChart/GasesChart";
import { TPopupData } from "../../../../types";
import { TimePeriod } from "../../../../utils/enums";

export const PdfLayout = forwardRef<HTMLDivElement, { data: TPopupData }>(({ data }, ref) => {
  return (
    <div ref={ref} className="pdf-layout">
      <div className="pdf-layout__charts">
        {data.parameters.map((param) => {
          if (!param.isActive) return null;

          switch (param.parameter) {
            case "Temperature":
              return <TemperatureChart key={param.parameter} period={TimePeriod.DAY}/>;
            case "Humidity":
              return <HumidityChart key={param.parameter} period={TimePeriod.DAY}/>;
            case "Air pollution":
              return <AirPollutionChart key={param.parameter} period={TimePeriod.DAY}/>;
            default:
              return null;
          }
        })}
      </div>

      {data.parameters
          .find((param) => param.parameter === "Gases contain in the air" && param.isActive) &&
        <div className="pdf-layout__gases-charts">
          {data.parameters
            .find((param) => param.parameter === "Gases contain in the air" && param.isActive)
            ?.checkmarks.filter((checkmark) => checkmark.isChecked)
            .map((checkmark) => (
              <GasesChart
                key={checkmark.label + (checkmark.sub || "")}
                title={checkmark.label}
                subtitle={checkmark.sub || ""}
                aggregateData={{ min: "54", mid: "69", max: "78" }}
                period={TimePeriod.DAY}
              />
            ))}
        </div>}
    </div>
  );
});