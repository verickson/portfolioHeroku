//database name
create database portfolioblog;

//table for blog
create table blog(
  id serial primary key,
  title text,
  posts text,
  //exerpt text,
  posttime timestamp DEFAULT current_timestamp
);

insert into blog(title, posts, posttime) values('title of post', 'this is a post', '2017-11-21 08:15:23.5');
