import { useState, useEffect } from "react";
import './tailwind.css';
import {
  Timeline,
  Button,
  Card,
  Progress
} from "flowbite-react";
 
import CustomDatepicker from './components/datepicker'

function Item({time, title, body})
{
  return (
    <Timeline.Item className="text-left">
      <Timeline.Point/>
      <Timeline.Content>
      <Timeline.Time>
        {time}
      </Timeline.Time>
      <Timeline.Title>
        {title}
      </Timeline.Title>
      <Timeline.Body>
        {body}
      </Timeline.Body>
      <Button color="gray" outline={true} className="hidden hover:block">
        Обмен
      </Button>
      </Timeline.Content>
    </Timeline.Item>
  )
}

function Duration({start, end}) {
  return (
    <div className="flex flex-col mx-10">
      <div className="flex flex-row justify-between">
        <span>{start}</span>
        <span>{end}</span>
      </div>
      <Progress progress={100} color="blue"/>
    </div>
  );
}

export default function ScheludeScreen()
{
  return (
    <Card className="m-10 min-h-screen">
      <div className="mx-auto block lg:hidden">
        <CustomDatepicker defaultShow={false} input=""/>
      </div>
      <div className="container mx-auto flex flex-row">
        <div className="basis-full lg:basis-3/4">
          <Timeline>
            <Item time="24 Февраля" title="Рабочая смена" body="8:00 - 17:00"/>
            <Item time="25 Февраля" title="Рабочая смена" body={<Duration start="8:00" end="17:00"/>}/>
            <Item time="26 Февраля" title="Рабочая смена" body={<Duration start="21:00" end="2:00"/>}/>
          </Timeline>
        </div>
        <div className="hidden lg:block lg:basis-1/4 mx-auto">
          <CustomDatepicker defaultShow={true} input="hidden"/>
        </div>
      </div>
    </Card>
  )
}