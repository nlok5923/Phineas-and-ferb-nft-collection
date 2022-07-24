import { Card } from 'antd';
import Axios from "axios"
import React, { useEffect, useState } from 'react';
import "./PostCard.scss"
const { Meta } = Card;

const PostCard = (props) => {

  const [postUri, setPostUri] = useState('');
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');

  const _setAndGetUri = async () => {
    const res = await Axios.get(props.data);
    setPostUri(res.data.uri);
    setName(res.data.name);
    setTitle(res.data.title);
  }

  useEffect(() => {
    _setAndGetUri();
  }, [props])

  return <Card
    hoverable
    style={{
      width: 240,
      border: "1px solid black",
      borderRadius: "5px",
      boxShadow: "3px 7px #a8a7a3"
    }}
    bordered={true}
    cover={<img alt="post" src={postUri} className="nft-img" />}
  >
     <Meta title={name} description={title} />
  </Card>
}

export default PostCard;